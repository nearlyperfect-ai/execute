function calculate() {
    const height = parseFloat(document.getElementById('height').value);
    const arm = parseFloat(document.getElementById('arm').value);
    const sep = parseFloat(document.getElementById('sep').value);
    const leg = parseFloat(document.getElementById('leg').value);
    const trunk = parseFloat(document.getElementById('trunk').value);
    const explosiveness = parseFloat(document.getElementById('explosiveness').value);
  
    const torque = sep * 1.3 + trunk * 0.7;
    const powerScore = torque + explosiveness * 10;
    const speed = 60 + (powerScore / 5);
  
    document.getElementById('output').innerHTML = `
      ⚡ Estimated Ball Speed: <strong>${speed.toFixed(1)} mph</strong><br>
      ⚙️ Efficiency Score: <strong>${Math.min(100, powerScore.toFixed(1))}/100</strong>
    `;
  }
  