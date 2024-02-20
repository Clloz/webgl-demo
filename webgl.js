function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }
  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }
  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

function initShader(gl, vsSource, fsSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
  const program = createProgram(gl, vertexShader, fragmentShader)
  gl.program = program
  console.log('program', program)
  gl.useProgram(program)
}

const fps = (selector) => {
  const maxFPS = 60
  const history = new Array(maxFPS).fill(1000)
  let historyIdx = 0
  let historyTotal = 60000
  let then = 0

  return function (now) {
    const deltaTime = now - then
    then = now

    historyTotal += deltaTime - history[historyIdx]
    history[historyIdx] = deltaTime
    historyIdx = (historyIdx + 1) % maxFPS
    const fps = (1000 / (historyTotal / maxFPS)).toFixed(1)
    if (selector) {
      document.querySelector(selector).textContent = `fps: ${fps}`
    }

    return fps
  }
}
