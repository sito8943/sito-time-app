import { useState } from "react";

function convertHoursToHHMM(hours) {
  const hh = Math.floor(hours); // Horas enteras
  const mm = Math.round((hours - hh) * 60); // Minutos redondeados
  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
}

function RealToTime() {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");

  async function calculate() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setResult(convertHoursToHHMM(value));
  }

  return (
    <main className="flex flex-col gap-5 mt-5">
      <h2 className="text-xl">
        Introduce la cantidad de horas en formato número real.
      </h2>

      <form
        className="flex items-center justify-start w-full"
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
      >
        <input
          type="number"
          className="input flex-1"
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Cantidad de horas (Ej: 2.01)"
        />
        <button type="submit" className="button">
          Calculate
        </button>
      </form>
      <p className="w-full px-1">Resultado: {result}</p>
    </main>
  );
}

export default RealToTime;
