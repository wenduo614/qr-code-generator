import { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";

export default function QRGenerator() {
  const [text, setText] = useState("Hello World");
  const [size, setSize] = useState(200);
  const [lang, setLang] = useState("en");
  const qrRef = useRef(null);

  const handleInput = (e) => {
    const input = e.target.value;
    setText(input);
    const newSize = Math.max(100, 300 - input.length * 5);
    setSize(newSize);
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.containerRef?.current?.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = `qrcode-${text}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const t = (en, zh) => (lang === "en" ? en : zh);

  return (
    <div className="min-h-screen bg-white p-4 print:p-0 print:bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {t("QR Code & Text Generator", "二维码与文字生成器")}
        </h1>
        <button
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
          className="text-sm underline text-blue-500"
        >
          {lang === "en" ? "中文" : "English"}
        </button>
      </div>

      <input
        type="text"
        value={text}
        onChange={handleInput}
        placeholder={t("Enter text here...", "请输入内容...")}
        className="p-2 border rounded w-full max-w-md mb-4"
      />

      <div className="flex flex-col items-center space-y-4 print:space-y-1">
        <QRCode
          ref={qrRef}
          value={text}
          size={size}
          logoImage="https://upload.wikimedia.org/wikipedia/commons/8/84/Example.svg"
          quietZone={10}
          ecLevel="H"
          logoWidth={size * 0.2}
          logoHeight={size * 0.2}
          qrStyle="dots"
          eyeRadius={10}
        />
        <p
          style={{ fontSize: Math.max(14, 36 - text.length) }}
          className="font-medium print:text-black"
        >
          {text}
        </p>
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 print:hidden"
        >
          {t("Download QR Code", "下载二维码")}
        </button>
      </div>
    </div>
  );
}
