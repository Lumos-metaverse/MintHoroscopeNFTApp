import Logo from "./components/Logo";
import Header from "./components/Header";
import './App.css';
import React, {useState,useEffect} from "react";

const zodiacSignArray = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const signs = new Map([["Aries", "https://ipfs.io/ipfs/bafybeigcik7dee57x6qorcdnwkrjpvmamk7n56dibrz6gvlteuhsadaa2e"],["Taurus", "https://ipfs.io/ipfs/bafybeih32ccuhrnw7yjtx33c6t6yjd4catdaqjjicssy332sr5w6ozewci"],["Gemini", "https://ipfs.io/ipfs/bafybeieihjeknxhsdj7mr4f2yewgcz5scaqqzryb3effefjegafcbyq7da"],["Cancer", "https://ipfs.io/ipfs/bafybeiakepu5nmu6vplaa7jy6jfkrtpn6pgww5zundtcdufq3htw55k6zq"],["Leo", "https://ipfs.io/ipfs/bafybeicn6k5bajx5fj7u7mcutgj5oinl2ebkvsqgwf7ce27d7vy2ed5iem"],["Virgo", "https://ipfs.io/ipfs/bafybeibt6taxemqyewvba2mmqti2qrgsih463ge3b43airbazsqifzvf3u"],["Libra", "https://ipfs.io/ipfs/bafybeiajqddi6x7kb4ofj462wqlctmadosfuxpoi7pb7jsjp7izgw5wpgu"],["Scorpio", "https://ipfs.io/ipfs/bafybeiaeva6fira76etfyw2di22h2dpyclmkckf4bx4vt474aidwiedcae"],["Sagittarius", "https://ipfs.io/ipfs/bafybeic5cqo74xayfn4thxscls7cxrwbgdpndwctj4367anmujcoa7lhoe"],
["Capricorn", "https://ipfs.io/ipfs/bafybeiad7ce3rprl6ywhbbwc42irnhqcgt6jnews7ns5b7zngrfrhccsny"],["Aquarius", "https://ipfs.io/ipfs/bafybeice2zaut53gdkby5u66vntizzqcwba37zphdgo2nxijfyu2t4uteq"],["Pisces", "https://ipfs.io/ipfs/bafybeifywiewyciipi5o7ugrbfhxmjqgmpzhgoqpjicuwf4yvk3cmtw6z4"]]);
const planets = new Map([["Sun", "https://ipfs.io/ipfs/bafybeifybpvobqhxglgmexlw6c6icdxc6wqwjvwlq675w4upuqgoyzn5ji"],["Moon","https://ipfs.io/ipfs/bafybeibwndegkhfwlzipdcmrrypvfho4lc7byswz7ofsv25yvh7xz63gtm"],["Mercury", "https://ipfs.io/ipfs/bafybeih7z3ttmt43zwbgrf73h4y4cvswrje4ukkglpon3oxba75yfivoci"],["Venus", "https://ipfs.io/ipfs/bafybeiftovwaaialxbgj6ioox4xjwrexawcb3ck7u3fiwrdnyq26rwhsqa"],["Mars", "https://ipfs.io/ipfs/bafybeihemckwcg4b7qh34hgo4b2ptg2pate4gyxei5wpf4hcrqx3e3qg5e"],["Jupiter", "https://ipfs.io/ipfs/bafybeibabxdevfle7mft5uvosmyyqt7pgd3e6r5feyi4p6umvmhonvbrja"],["Saturn", "https://ipfs.io/ipfs/bafybeihujabcvgcz3cza6bnwcea5uduit364al5dueuhdatgqepzfxajru"], ["Uranus", "https://ipfs.io/ipfs/bafybeibarpjofit3sfyis2vwlo2pfqzqworn2msbcsy2dpkma7uhzwel2i"], ["Neptune", "https://ipfs.io/ipfs/bafybeigatylragz7d7knezlwh2cuxzlbribn37oenevx2tv7trmwnsjc2i"], ["Pluto", "https://ipfs.io/ipfs/bafybeib2fzmt2tewaxfin2owxu3qyiyfdlleaelq3ds5hdegrgyzat557u"]]);
const northnode = new Map([["Aries", ["01271949", "07261950", "08201967", "04191969", "04071986", "12021987", "12272004", "06222006", "07192023", "01112024"]], 
["Taurus", ["02201966","08191967","09121984","04061986", "04152003","12262004", "01182022","07182023"]], 
["Gemini", ["08261964","02191966","03171983","09111984","10142001","04142003","05062020","01182022"]],
["Cancer", ["12241962","08251964","09251981","03161983","04102000","10132001","11072018","05052020"]], 
["Leo", ["06111961","12231962","01061980","09241981","10211998","04092000","05102017","11062018"]], 
["Virgo", ["12161959","06101961","07061978","01051980","01261997","10201998","11132015","05092017"]],
["Libra", ["06171958","12151959","06081977","07051978","08011995","01251997","02192014","11122015"]], 
["Scorpio", ["10051956","06161958","07101975","01071977","02021994","07311995","08312012","02182014"]], 
["Sagittarius", ["04031955","10041956","10281973","07091975","08021992","02011994","03032011","08302012"]], 
["Capricorn", ["10101953","04021955","04281972","10271973","11191990","08011992","08212009","03022011","03272028","09232029"]], 
["Aquarius", ["03291952","10091953","11031970","04271972","05231989","11181990","12192007","08212009","04282026","03262028"]], 
["Pisces", ["07271950","03281952","04201969","11021970","12031987","05221989","06232006","12182007","01122024","04272026"]]]);

//const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlCRDhBODJiRDNGMjcyRjFCZDI1REYwNWZlOUZEMEM5QTRhYjA3QkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5OTMzNzY3NDUyOCwibmFtZSI6Ikhvcm9zY29wZSBORlQifQ.p3WMoAfmaTDuczS_8FwUWyQt1iMPM-gZlYwAUtID2WI' })

function App() {
  const [date, setDate] = useState("1992-08-31");
  const [time, setTime] = useState("15:00");
  const [walletAddress, setwalletAddress] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [SunSign, setSunSign] = useState(null);
  const [RisingSign, setRisingSign] = useState(null);
  const [ChartRuler, setChartRuler] = useState(null);
  const [NorthNodeSign, setNorthNodeSign] = useState(null);
  const allNFTs = [signs.get(SunSign),signs.get(RisingSign),planets.get(ChartRuler),signs.get(NorthNodeSign)];
  const [isMinting, setIsMinting] = useState(false);

  const ConnectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install metamask");
        return;
      } else {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setwalletAddress(accounts[0]);
        console.log("Connected", walletAddress);
      }
      } catch (error) {
      console.log(error);
    }
    };

    useEffect(() => {
      calculateSunSign(date);
      calculateRisingSign(time);
      calculatechartRuler()
      calculatenorthnode(date);
    });

    async function mintNFT(allNFTs) {
      setIsMinting(true);
      try {
        for (var i = 0; i < allNFTs.length; i++) {
          //const transaction = await NFTContract.mintNFT(account, SunSign);
          console.log("dumbass");
        // Wait for the transaction to be confirmed
        //await transaction.wait();
        }
        
    
        // Transaction is confirmed, you can perform any additional actions here if needed
      } catch (e) {
        // Handle errors
      } finally {
        setIsMinting(false);
      }
    }

    function calculateRisingSign(time) {
      var finalRisingSignArray = [];
      const start_index = zodiacSignArray.indexOf(SunSign);
      for (var i = start_index; i < zodiacSignArray.length; i++) {
        finalRisingSignArray.push(zodiacSignArray[i]);
        if (i === 12) {
          break;
        }
      }

      for (var j = 0; j < start_index; j++) {
        finalRisingSignArray.push(zodiacSignArray[j]);
      }
      const risingSignTimes = new Map();
      risingSignTimes.set(finalRisingSignArray[0], [4,5])
      risingSignTimes.set(finalRisingSignArray[1], [6,7])
      risingSignTimes.set(finalRisingSignArray[2], [8,9])
      risingSignTimes.set(finalRisingSignArray[3], [10,11])
      risingSignTimes.set(finalRisingSignArray[4], [12,13])
      risingSignTimes.set(finalRisingSignArray[5], [14,15])
      risingSignTimes.set(finalRisingSignArray[6], [16,17])
      risingSignTimes.set(finalRisingSignArray[7], [16,19])
      risingSignTimes.set(finalRisingSignArray[8], [20,21])
      risingSignTimes.set(finalRisingSignArray[9], [22,23])
      risingSignTimes.set(finalRisingSignArray[10], [0,1])
      risingSignTimes.set(finalRisingSignArray[11], [2,3])

      const risingSignValue = Number(time.slice(0,2));

      for (let [key, value] of risingSignTimes) {
        if (risingSignValue === value[0] || risingSignValue === value[1])
        setRisingSign(key);
        }
    }

    function calculatechartRuler(){
      const chartRulerMap = new Map();
      chartRulerMap.set(zodiacSignArray[0], "Mars");
      chartRulerMap.set(zodiacSignArray[1], "Venus");
      chartRulerMap.set(zodiacSignArray[2], "Mercury");
      chartRulerMap.set(zodiacSignArray[3], "Moon");
      chartRulerMap.set(zodiacSignArray[4], "Sun");
      chartRulerMap.set(zodiacSignArray[5], "Mercury");
      chartRulerMap.set(zodiacSignArray[6], "Venus");
      chartRulerMap.set(zodiacSignArray[7], "Pluto");
      chartRulerMap.set(zodiacSignArray[8], "Jupiter");
      chartRulerMap.set(zodiacSignArray[9], "Saturn");
      chartRulerMap.set(zodiacSignArray[10], "Uranus");
      chartRulerMap.set(zodiacSignArray[11], "Neptune");
      const RulingPlanet = chartRulerMap.get(RisingSign);
      setChartRuler(RulingPlanet);
    }

    function calculateSunSign(date) {
      let dateObject = new Date(date);
      let day = dateObject.getDate();
      let month = dateObject.getMonth();
      if (month === 0) {
        if (day >= 20) {
          setSunSign("Aquarius");
        } else {
          setSunSign("Capricorn");
        }
      } else if (month === 1) {
        if (day >= 19) {
          setSunSign("Pisces");
        } else {
          setSunSign("Aquarius");
        }
      } else if (month === 2) {
        if (day >= 21) {
          setSunSign("Aries");
        } else {
          setSunSign("Pisces");
        }
      } else if (month === 3) {
        if (day >= 20) {
          setSunSign("Taurus");
        } else {
          setSunSign("Aries");
        }
      } else if (month === 4) {
        if (day >= 21) {
          setSunSign("Gemini");
        } else {
          setSunSign("Taurus");
        }
      } else if (month === 5) {
        if (day >= 21) {
          setSunSign("Cancer");
        } else {
          setSunSign("Gemini");
        }
      } else if (month === 6) {
        if (day >= 23) {
          setSunSign("Leo");
        } else {
          setSunSign("Cancer");
        }
      } else if (month === 7) {
        if (day >= 23) {
          setSunSign("Virgo");
        } else {
          setSunSign("Leo");
        }
      } else if (month === 8) {
        if (day >= 23) {
          setSunSign("Libra");
        } else {
          setSunSign("Virgo");
        }
      } else if (month === 9) {
        if (day >= 23) {
          setSunSign("Scorpio");
        } else {
          setSunSign("Libra");
        }
      } else if (month === 10) {
        if (day >= 21) {
          setSunSign("Sagittarius");
        } else {
          setSunSign("Scorpio");
        }
      } else if (month === 11) {
        if (day >= 22) {
          setSunSign("Capricorn"); 
        } else {
          setSunSign("Sagittarius");
        }
      }
    }
    
    function calculatenorthnode(date) {
      let dateObject = new Date(date);
      let year = dateObject.getFullYear();
      let month = dateObject.getMonth()+1;
      let day = dateObject.getDate();
      for (let [key, value] of northnode) {
        for (var i = 0; i < value.length; i+=2) {
          var month2 = Number(value[i].slice(0,2));
          var day2 = Number(value[i].slice(2,4));
          var year2 = Number(value[i].slice(4,8));
          var month3 = Number(value[i+1].slice(0,2));
          var day3 = Number(value[i+1].slice(2,4));
          var year3 = Number(value[i+1].slice(4,8));
          if (year > year2 && year < year3) {
                setNorthNodeSign(key);
          }

          else if (year === year2 && month > month2){
                setNorthNodeSign(key);
          }

          else if (year === year2 && month === month2 && day > day2){
                setNorthNodeSign(key);
          }

          else if (year === year3 && month < month3){
                setNorthNodeSign(key);
          }

          else if (year === year3 && month === month2 && day < day3){
            setNorthNodeSign(key);
          }
        }
        }
      }
  function handleDateInput({ target }) {
      setDate(target.value);
  }

  function handleTimeInput({ target }) {
    setTime(target.value);
}

  return (
    <div className="App">
      <header className="center">
      <Logo />
      <Header title = "Mint Horoscope NFT App" />
      <div className = "right">
          {walletAddress === null ? (<button onClick={() => ConnectWallet()} > Metamask Connect Wallet </button>) 
          : (<p> Wallet Address Connected </p>)}
      </div>
      <div>
      <input type = "text" placeholder = "Enter your full name" onChange={(e)=>(setFullName(e.target.value))}/>
      <br />
      <br />
      <input onChange={handleDateInput} value={date} type="date" id="dob" />
      <input onChange={handleTimeInput} value={time} type="time" id="tob" />
          <br />
          <br />
          <label> <b> Full Name: </b> {FullName}</label>
          <br />
          <br />
          <label> <b>Sun Sign &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Rising Sign &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Chart Ruler &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; North Node </b> </label> <br /> <br /> 
          <img src={signs.get(SunSign)} width={225} height={225} alt="Sunsign" />
          <img src={signs.get(RisingSign)} width={225} height={225} alt="Risingsign" />
          <img src={planets.get(ChartRuler)} width={225} height={225} alt="ChartRuler" />
          <img src={signs.get(NorthNodeSign)} width={225} height={225} alt="NorthNode" />
          <br />
          <br />
          <button disabled={isMinting} onClick={mintNFT}>
          {isMinting ? "Minting..." : "Mint"}
      </button>
      </div>

      </header>
    </div>
  );
}  
export default App;