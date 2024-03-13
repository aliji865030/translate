import React from "react";
import axios from "axios";
import { useState } from "react";
import { data } from "../components/data";

const LandinPage = () => {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [text, setText] = useState();
  const [result, setResult] = useState();

  async function translate() {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", sourceLanguage);
    encodedParams.set("target_language", targetLanguage);
    encodedParams.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "d3ca8691b5mshdf20109d6f12293p1f90b5jsnc64cef66f8f5",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data.data.translatedText);
      setResult(response.data.data.translatedText);
      document.querySelector(".resultP").style.display="block"
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div >
      <div className="b bg-slate-400 border-4 p-10 rounded-lg">
      <div className="flex justify-center gap-7 ">
        <select
          name="source-language"
          id=""
          value={sourceLanguage}
          onChange={(e) => {
            setSourceLanguage(e.target.value);
          }}
          className="px-3 border rounded-md"
        >
          {Object.entries(data).map(([language, code]) => (
            <option key={code} value={code}>
              {language}
            </option>
          ))}
        </select>

        <select
          name="target-language"
          id=""
          value={targetLanguage}
          onChange={(e) => {
            setTargetLanguage(e.target.value);
          }}
          className="px-3 border rounded-md"
        >
          {Object.entries(data).map(([language, code]) => (
            <option key={code} value={code}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center gap-7 pt-7">
        <input
          type="text"
          className="border-4 px-2"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Enter text to translate"
        />
        <button onClick={translate} className="b bg-green-500 rounded-xl px-5 py-2 border-2 hover:bg-green-600 text-white text-xl">Translate</button>
      </div>
      </div>
      <div className="resultP text-center mt-20 w-ful bg-blue-200 py-5 px-7 rounded-md" style={{display:"none"}}>
        <p >{result}</p>
      </div>
    </div>
    </>
  );
};

export default LandinPage;
