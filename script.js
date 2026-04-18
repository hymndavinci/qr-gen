(function buildPlaceholder() {
    const grid = document.getElementById('placeholderGrid');
    const cornerPositions = new Set([
      '0,0','0,1','0,2','1,0','2,0','2,1','2,2',
      '0,4','0,5','0,6','1,6','2,4','2,5','2,6',
      '4,0','4,1','4,2','5,0','6,0','6,1','6,2'
    ]);
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const span = document.createElement('span');
        if (cornerPositions.has(`${r},${c}`)) {
          span.style.background = 'var(--text-dim)';
        } else if (Math.random() > 0.55) {
          span.style.background = 'var(--border)';
        } else {
          span.style.background = 'transparent';
        }
        grid.appendChild(span);
      }
    }
  })();

  let qrCount = 0;
  let currentSize = 256;
  let debounceTimer;

  function setSize(size, btn) {
    currentSize = size;
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    generateQR();
  }

  function onColorChange(type, value) {
    document.getElementById(type === 'fg' ? 'fgHex' : 'bgHex').textContent = value;
    generateQR();
  }

  function onInputChange() {
    clearTimeout(debounceTimer);
    document.getElementById('statStatus').textContent = 'typing…';
    debounceTimer = setTimeout(generateQR, 300);
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return [r,g,b];
  }

  function drawModernQR(matrix, canvas, fgHex, bgHex, size) {
    const n = matrix.length;
    const padding = Math.round(size * 0.055);
    const cellSize = (size - padding * 2) / n;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, size, size);

    

    const finderPos = [[0,0],[0,n-7],[n-7,0]];
    const isInFinderQuiet = (r, c) => finderPos.some(([fr,fc]) =>
      r >= fr-1 && r < fr+8 && c >= fc-1 && c < fc+8
    );

    const cx = (col) => padding + col * cellSize + cellSize / 2;
    const cy = (row) => padding + row * cellSize + cellSize / 2;
    const r = cellSize * 0.42;

    ctx.fillStyle = fgHex;
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (!matrix[row][col]) continue;
        if (isInFinderQuiet(row, col)) continue;
        ctx.beginPath();
        ctx.arc(cx(col), cy(row), r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    finderPos.forEach(([fr, fc]) => {
      const x = padding + fc * cellSize;
      const y = padding + fr * cellSize;
      const fw = cellSize * 7;
      const bord = cellSize * 0.7;

      ctx.fillStyle = fgHex;
      roundRect(ctx, x, y, fw, fw, cellSize * 1.2);

      ctx.fillStyle = bgHex;
      roundRect(ctx, x + bord, y + bord, fw - bord*2, fw - bord*2, cellSize * 0.8);

      ctx.fillStyle = fgHex;
      const is = cellSize * 3;
      const io = (fw - is) / 2;
      roundRect(ctx, x + io, y + io, is, is, cellSize * 0.5);
    });
  }

  function roundRect(ctx, x, y, w, h, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  function generateQR() {
    const text = document.getElementById('urlInput').value.trim();
    const canvas = document.getElementById('qrCanvas');
    const placeholder = document.getElementById('qrPlaceholder');
    const glow = document.getElementById('qrGlow');

    if (!text) {
      canvas.classList.remove('visible');
      placeholder.classList.remove('hidden');
      document.getElementById('statStatus').textContent = 'idle';
      document.getElementById('previewLabel').textContent = '—';
      return;
    }

    const fgHex = document.getElementById('fgColor').value;
    const bgHex = document.getElementById('bgColor').value;

    try {
      const qr = qrcode(0, 'H');
      qr.addData(text);
      qr.make();
      const n = qr.getModuleCount();
      const matrix = [];
      for (let r = 0; r < n; r++) {
        matrix[r] = [];
        for (let c = 0; c < n; c++) matrix[r][c] = qr.isDark(r, c);
      }
      drawModernQR(matrix, canvas, fgHex, bgHex, currentSize);
    } catch(e) {
      try {
        const qr = qrcode(0, 'L');
        qr.addData(text);
        qr.make();
        const n = qr.getModuleCount();
        const matrix = [];
        for (let r = 0; r < n; r++) {
          matrix[r] = [];
          for (let c = 0; c < n; c++) matrix[r][c] = qr.isDark(r, c);
        }
        drawModernQR(matrix, canvas, fgHex, bgHex, currentSize);
      } catch(e2) { return; }
    }

    placeholder.classList.add('hidden');
    canvas.classList.add('visible');
    glow.classList.add('active');

    qrCount++;
    document.getElementById('statCount').textContent = qrCount;
    document.getElementById('statSize').textContent = currentSize + 'px';
    document.getElementById('statStatus').textContent = 'ready ✓';

    const label = text.length > 36 ? text.slice(0, 34) + '…' : text;
    document.getElementById('previewLabel').textContent = label;
  }

  function downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    if (!canvas.classList.contains('visible')) {
      showToast('Generate a QR first!');
      return;
    }
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Downloaded!');
  }

  function copyText() {
    const text = document.getElementById('urlInput').value.trim();
    if (!text) { showToast('Nothing to copy'); return; }
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }