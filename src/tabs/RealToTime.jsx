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
    <section className="flex flex-col gap-5 mt-5">
      <h2 className="text-xl">Introduce la cantidad de horas en formato número real.</h2>

      <form
        className="flex items-center justify-start w-full"
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
      >
        <input
          className="bg-blue-500 text-gray-100 px-4 py-1 flex-1"
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Cantidad de horas (Ej: 2.01)"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-gray-100 hover:text-white px-4 py-1"
        >
          Calculate
        </button>
      </form>
      <p className="w-full px-1">Resultado: {result}</p>
    </section>
  );
}

export default RealToTime;
