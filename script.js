// Algoritmo Euclidiano Estendido (iterativo)
function extendedGcd(a, b) {
    a = Number(a);
    b = Number(b);
  
    let old_r = a, r = b;
    let old_s = 1, s = 0;
    let old_t = 0, t = 1;
  
    while (r !== 0) {
      let q = Math.trunc(old_r / r);
  
      let tmp = r;
      r = old_r - q * r;
      old_r = tmp;
  
      tmp = s;
      s = old_s - q * s;
      old_s = tmp;
  
      tmp = t;
      t = old_t - q * t;
      old_t = tmp;
    }
  
    let d = Math.abs(old_r);
    if (old_r < 0) {
      old_s = -old_s;
      old_t = -old_t;
    }
  
    return { d: d, x: old_s, y: old_t };
  }
  
  function solveDiophantine(a, b, c) {
    a = Math.trunc(Number(a));
    b = Math.trunc(Number(b));
    c = Math.trunc(Number(c));
  
    if (a === 0 && b === 0) {
      if (c === 0) {
        return { infinite: true, message: "Qualquer (x,y) é solução (0x+0y=0)." };
      } else {
        return { none: true, message: "Sem solução: 0x + 0y = c com c ≠ 0." };
      }
    }
  
    const ext = extendedGcd(a, b);
    const d = ext.d;
  
    if (c % d !== 0) {
      return { none: true, d: d, message: `gcd(a,b) = ${d} não divide ${c}.` };
    }
  
    const mult = c / d;
    const x0 = ext.x * mult;
    const y0 = ext.y * mult;
  
    return {
      d,
      particular: { x: x0, y: y0 },
      general: {
        x: `${x0} + ${(b / d)}·t`,
        y: `${y0} - ${(a / d)}·t`
      }
    };
  }
  
  // DOM
  const aInput = document.getElementById('a');
  const bInput = document.getElementById('b');
  const cInput = document.getElementById('c');
  const out = document.getElementById('output');
  const solveBtn = document.getElementById('solveBtn');
  const randomBtn = document.getElementById('randomBtn');
  const clearBtn = document.getElementById('clearBtn');
  
  function showResult(obj) {
    out.style.display = 'block';
    if (obj.none) {
      out.textContent = `Sem solução.\n${obj.message}`;
      return;
    }
    if (obj.infinite) {
      out.textContent = obj.message;
      return;
    }
    const { d, particular, general } = obj;
    out.textContent =
      `gcd(a,b) = ${d}\n\n` +
      `Solução particular:\n x₀ = ${particular.x}\n y₀ = ${particular.y}\n\n` +
      `Solução geral (t ∈ Z):\n x = ${general.x}\n y = ${general.y}`;
  }
  
  solveBtn.addEventListener('click', () => {
    const res = solveDiophantine(aInput.value, bInput.value, cInput.value);
    showResult(res);
  });
  
  randomBtn.addEventListener('click', () => {
    function randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    aInput.value = randInt(-40, 40) || 15;
    bInput.value = randInt(-40, 40) || 25;
    cInput.value = randInt(-200, 200) || 100;
    out.style.display = 'none';
  });
  
  clearBtn.addEventListener('click', () => {
    out.style.display = 'none';
    out.textContent = '';
  });
  
