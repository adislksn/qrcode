import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import "./App.css";
import QRCodeStyling from "qr-code-styling";
import profile from "./assets/img/20210209_173309.jpg"

const qrCode = new QRCodeStyling({
  dotsOptions: {
    type: "rounded"
  },
  cornersSquareOptions:{
    type:"extra-rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
});

export default function App() {
  const [url, setUrl] = useState("https://adislksn.github.io");
  const [ratio, setRatio] = useState(1000);
  const [figure, setFigure] = useState();
  const [coloredCorner, setColorcorner] = useState("#000000");
  const [coloredInside, setColorinside] = useState("#000000");
  const [preview, setPreview] = useState();
  // const [selectedFile, setSelectedFile] = useState()
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  useEffect(() => {
    qrCode.update({
      width: ratio,
      height: ratio
    });
  }, [ratio]);

  useEffect(() => {
    qrCode.update({
      image: preview
    });
  }, [preview]);

  useEffect(() => {
    qrCode.update({
      dotsOptions:{color: coloredInside}
    });
  }, [coloredInside]);

  useEffect(() => {
    qrCode.update({
      cornersSquareOptions:{color: coloredCorner}
    });
  }, [coloredCorner]);

  const onExtensionChange = (e) => {
    setFileExt(e.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!figure) {
        setPreview("https://is4-ssl.mzstatic.com/image/thumb/Podcasts123/v4/08/70/b6/0870b67b-797f-7758-2ca9-ee39f87538ba/mza_11596600672974927802.jpg/600x600bb.jpg")
        return
    }
    const objectUrl = URL.createObjectURL(figure)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [figure])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setFigure(undefined)
        return
      }else if (e.target.files[0].size > 5242880){
        alert("File is too big or to small!")
        setFigure(undefined)
        return
    }

    // I've kept this example simple by using the first image instead of multiple
    setFigure(e.target.files[0])
  }

  return (
    <div className="App">
      <div className="bg-gray-800 overflow-x-hidden">
      <header className="relative flex-col justify-center pt-7">
        <nav className="relative mx-14 max-sm:mx-3 flex flex-row items-center justify-between">
            <a className="w-20 rounded-full hover:animate-pulse" href="https://adislksn.github.io">
                <img className="w-20 rounded-full" src={profile} alt="🧛🏻"></img>
            </a>
            <a href="https://adislksn.github.io">
                <button id="myBtn" className="relative inline-flex items-center justify-center p-0.5 mb-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-300 to-cyan-300 group-hover:from-cyan-300 group-hover:to-cyan-300 hover:text-slate-900 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <p className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-800 dark:bg-gray-800 rounded-md group-hover:bg-opacity-0 text-slate-200 hover:text-slate-800 font-poppins">
                        Work together?
                    </p>
                </button>
            </a>
        </nav> 
      </header>

      <div className="relative text-center flex flex-col py-5 max-md:py-10 max-sm:py-14">
        <section className="text-center flex flex-col">
            <p className="text-cyan-300 text-5xl max-sm:text-4xl font-batuphat">QR Code Generator</p>
            <div className="text-cyan-100 pt-10 pb-2">Generate QRCode for anything!</div>
        </section>
      
        <section className="relative w-4/5 self-center flex-col">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fa-solid fa-qrcode w-5 h-5 text-gray-500 dark:text-gray-400"></i>
            </div>
            <section className="relative py-4 self-center">
              <label className="cursor-pointer block w-full p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-md shadow-cyan-300 bg-opacity-75" for="file_input" >Upload file</label>
              <input type="file" id="file_input" className="hidden" onChange={onSelectFile} style={styles.inputBox}/>
              {/* <input type="file" id="file_input" class="" onchange={onSelectFile} /> */}
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" >SVG, PNG, JPG or GIF (MAX. 5MB).</p>
            </section>

            <section>
              <label className="relative p-4 text-white font-bold text-lg"  for="text-input">Input Text</label>
              <input className="caret-cyan-300 block w-full mb-6 p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-md shadow-cyan-300 bg-opacity-75"
                  type="text" 
                  placeholder="Type something..." 
                  id="text-input"
                  value={url} onChange={(e) => setUrl(e.target.value)}/>
            </section>

            <section>
              <label className="relative p-4 text-white font-bold text-lg" for="ratio-input">Image Ratio</label>
              <input className="caret-cyan-300 block w-full mb-4 p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-md shadow-cyan-300 bg-opacity-75"  
                  type="text" 
                  id="ratio-input"
                  value={ratio} onChange={(e) => setRatio(e.target.value)} />
            </section>
            
            <section>
              <label className="relative p-4 text-white font-bold text-lg" for="inside-color-input">Inside Dots Color</label>
              <input className="block w-full mb-4 p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-md shadow-cyan-300 bg-opacity-75"  
                  type="color" 
                  id="inside-color-input"
                  value={coloredInside} onChange={(e) => setColorinside(e.target.value)} />
            </section>
            
            <section>
              <label className="relative p-4 text-white font-bold text-lg" for="corner-color-input">Corner Dots Color</label>
              <input className="block w-full mb-4 p-4 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-md shadow-cyan-300 bg-opacity-75"  
                  type="color" 
                  id="corner-color-input"
                  value={coloredCorner} onChange={(e) => setColorcorner(e.target.value)} />
            </section>

        </section>

            <section className="relative flex-row flex py-4 self-center">
              <div className="px-2">
                <select onChange={onExtensionChange} value={fileExt} className="text-black bg-cyan-300 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WEBP</option>
                </select>
              </div>
              <div className="px-2">
                <button className="text-black bg-cyan-300 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" onClick={onDownloadClick}>
                  Download
                </button>
              </div>
            </section>
      </div>
      <div className="flex justify-center object-contain">
        <div className="qr-controller" ref={ref} />
      </div>
      <footer className="py-4">
      </footer>
      </div>
    </div>
  );
}

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20
  }
};
