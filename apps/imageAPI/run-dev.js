const { spawn } = require("child_process");
const os = require("os");
const path = require("path");

const isWindows = os.platform() === "win32";
const uvicornPath = isWindows
  ? path.join(".venv", "Scripts", "uvicorn.exe")
  : path.join(".venv", "bin", "uvicorn");

const cmd = spawn(uvicornPath, ["app.main:app", "--reload", "--port", "8000"], {
  stdio: "inherit",
  shell: isWindows,
});

cmd.on("exit", (code) => {
  process.exit(code);
});
