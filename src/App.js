import Logo from "./components/Logo";
import Header from "./components/Header";
import {NFTStorage,File} from 'nft.storage';
import './App.css';
import React, {useState,useEffect} from "react";
import { ContractABI, ContractAddress } from "./utils/contractdeets";
const ethers = require("ethers");
const {ethereum} = window;
const allNFTs = [];
const zodiacSignArray = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const signs = new Map([["Aries", "https://ipfs.io/ipfs/bafybeibb3vbuyws22sn46ntehzuurhyfvleywzeli7bgvkknph32rhvxmu/Aries.png"],["Taurus","https://ipfs.io/ipfs/bafybeidhmemze7fi6vhc4ey2dpyfdm3jiukrgineno6d6l6j4sbrajeovu/Taurus.png"], ["Gemini","https://ipfs.io/ipfs/bafybeiczqlr7hs3f6yszk4cw4ktoqeccr4eokhmqwbg45cqtjqtg44lrvq/Gemini.png"],["Cancer","https://ipfs.io/ipfs/bafybeidhw6oeks7xu6hxfv2ofvdmy3jnuropdiymfl5tzm2ts27co3iz5m/Cancer.png"],["Leo","https://ipfs.io/ipfs/bafybeidg7ibqmvyabxtlsfkb6wgc5zuz3pekxtphl6sqqcgu2utwzgex6u/Leo.png"],["Virgo","https://ipfs.io/ipfs/bafybeihcrijz7l5k4abo4fq67acovabd5joaoo6sqo4huwgrqrwkqcrccu/Virgo.png"], 
["Libra","https://ipfs.io/ipfs/bafybeih5i67driw5rmtinyelkzf6r634jr52shw2ldwbddj7q6hhpgybcy/Libra.png"], ["Scorpio","https://ipfs.io/ipfs/bafybeihfmq7ht7y4oscndfp6yaiqsjoqa5sfxvefckinguqeant3h6sl4a/Scorpio.png"], ["Sagittarius","https://ipfs.io/ipfs/bafybeiciimvqst7pdl7ra5lzbrx4sh4pqli4neavlsxyzbami43yd7wl54/Sagittarius.png"], ["Capricorn","https://ipfs.io/ipfs/bafybeicgjqatcll33kgkn2lx6zfgzfcf7ththtiktt53zwvwyevpfte3tq/Capricorn.png"], ["Aquarius","https://ipfs.io/ipfs/bafybeigczwtrixvi6hdvdr5cevx4japleodv5rbrqljuelz75477obdgqa/Aquarius.png"], ["Pisces","https://ipfs.io/ipfs/bafybeialdlquk5f6cc75hjdh5evxvwovbfjg5o6b4cavjvcyjdn3u3ny6m/Pisces.png"]]);
const planets = new Map([["Sun","https://ipfs.io/ipfs/bafybeicnmyzcf3ozqgyq2tgfcxojjylogoprjwkdf3tpywu2wcfkvetji4/Sun.png"],["Moon","https://ipfs.io/ipfs/bafybeidk6xqpwi4rhyralnr7nwkk2mpzm2ctp7r25weei2ydd67lepjbei/Moon.png"],["Mercury","https://ipfs.io/ipfs/bafybeihhn4yfd5smwoiiuohiissoqzwa23fljavmt6lacmqvfljvfosmbm/Mercury.png"],["Venus","https://ipfs.io/ipfs/bafybeih2ty4awpqwzjphcjmcmfsok3erltxcj6ps7ttvz7olnngvmuy64u/Venus.png"],["Mars","https://ipfs.io/ipfs/bafybeidqktns6cm4snodxymsl2yoyielsmcoqp36b6oevyqpxjyrh2f6sq/Mars.png"],
["Jupiter","https://ipfs.io/ipfs/bafybeihhh2eq7yy7hjhbsgblnl4jef5b4n6rwiifaz74sbycv6ffdjfkgm/Jupiter.png"],["Saturn","https://ipfs.io/ipfs/bafybeiajfoh6ablj5cbn57lhtrm7uqtmxdbk7cy7ijtbdqteajxgitbnfi/Saturn.png"],["Uranus","https://ipfs.io/ipfs/bafybeia3zpj2lxz3zcqnwblu4s6m5ob76w4nhjwdndgci5mdebupbc5o6m/Uranus.png"],["Neptune","https://ipfs.io/ipfs/bafybeibhqxtb75gward3x53dq6llviqcfi46uh5luls32sjvvazali66ky/Neptune.png"],["Pluto","https://ipfs.io/ipfs/bafybeicojzrbcmzqyedq6uhvqvpe5vi4cnmrv62gpzekas3imc44kkahlm/Pluto.png"]]);
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
const tokenURIArray = new Map([['Aries','ipfs://bafyreiacr5nixpq6c74yesql7yameiabdmvuru4csertahd3hdyvqf2gri/metadata.json'],['Taurus','ipfs://bafyreiddab7wpn3ofs5t4uc5k4iighlq5ekwbzmfm2obeqcnektxogtmwq/metadata.json'],['Gemini','ipfs://bafyreidjglh7lltrgnfauatx7ocsccocytrxwklblft2fyyvg2r35brqiy/metadata.json'],['Cancer','ipfs://bafyreicc4yt2ins2lijediwbff3jtedxb2gxsfgydorissb3afkxnvih6m/metadata.json'],['Leo','ipfs://bafyreieee4tkhryhh3mlg5ivyypntekynplcdfqp5uectrdug7lwx2b43y/metadata.json'],['Virgo','ipfs://bafyreigquas24vkv7udlibhafakbfcjnmv2nrm2a4qfbrts5bka2gpitz4/metadata.json'], ['Libra','ipfs://bafyreifiez7rgq6c6pej5xrd6a77htijqlw352uslqtlpw62vqyqj4cp7y/metadata.json'],['Scorpio','ipfs://bafyreigz4gcdqbuliyoqfkxj23x3dwk6hwqd6s5zwh3mlo5bsbpvro46hq/metadata.json'],['Sagittarius','ipfs://bafyreihras2bw26eesqbohueiqn2nddxm4a7csplrskcdngsqik7wnnel4/metadata.json'],['Capricorn','ipfs://bafyreievenvfxdsl4jhpfghfbwrx2metbwlbdedam5ztbxrqkb5vj7geui/metadata.json'],['Aquarius','ipfs://bafyreig5nmnm5cavlrijjoxumup7sm4i2r2rfmulsnsuzqsu4qq3je57zi/metadata.json'],['Pisces','ipfs://bafyreibhzinw3xevibbz6ekvq7zntt3ngeodz2hyguqrnirojcc3j43dhq/metadata.json'],['Sun','ipfs://bafyreidvwrxqxtqlwvinak77yx2yh7tuhh633npakoyet6vj3hivqhjzm4/metadata.json'],['Moon','ipfs://bafyreih45hu74mslr4ayqotfbmbfuhc7nppvtsrajqhisnuuy5ekg5zhhi/metadata.json'],['Mercury','ipfs://bafyreibb7g557u5g27v6l5tj6eykaqlnttgcmz34yyr53szqcf5mq4p6v4/metadata.json'],['Venus','ipfs://bafyreid5pyyg36u7jxrhqdhi3xxv7575pelzf4qc6fkx6jd36spbwvd3ai/metadata.json'],['Mars','ipfs://bafyreigdoh5jfseibsqg7plng74c4qomnmxugbd2mklsyk753knskl7q3q/metadata.json'],['Jupiter','ipfs://bafyreifve5nk3g4xmutz5lvl4rix5pwy5frnixa4lngryrvh5odl6jaqhq/metadata.json'],['Saturn','ipfs://bafyreid6ybl4yguh2ynqujprpeynh3xcxsag2ki7zfxmsqx3dqqsyvwo2e/metadata.json'],['Uranus','ipfs://bafyreih3aekkevkuvsskwd4hcw2frtzhl5j4ikfphjvloph4gf5ioeo7a4/metadata.json'],['Neptune','ipfs://bafyreigybsokkljrialy2x7b2gd7ukrsvcur5prvzrg4descsfuaws3hqa/metadata.json'],['Pluto','ipfs://bafyreiccslo76h7ko3uvfpq5u6bxf6pgnmb2apd34hf4f2oex3x47sytfm/metadata.json']])
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlCRDhBODJiRDNGMjcyRjFCZDI1REYwNWZlOUZEMEM5QTRhYjA3QkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5OTMzNzY3NDUyOCwibmFtZSI6Ikhvcm9zY29wZSBORlQifQ.p3WMoAfmaTDuczS_8FwUWyQt1iMPM-gZlYwAUtID2WI' })
const CHAIN_ID = 80001;
const NETWORK_NAME = "Mumbai";

function App() {
  const [date, setDate] = useState("1979-01-19");
  const [time, setTime] = useState("18:45");
  const [walletAddress, setwalletAddress] = useState(null);
  const [FullName, setFullName] = useState("Dan");
  const [SunSign, setSunSign] = useState(null);
  const [RisingSign, setRisingSign] = useState(null);
  const [ChartRuler, setChartRuler] =  useState(null);
  const [NorthNodeSign, setNorthNodeSign] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [isStoring, setIsStoring] = useState(false);
  //const [NFTname, setNFTName] = useState("");
  //const [NFTdescription, setNFTDescription] = useState("");
  //const [NFTfile, setNFTFile] = useState(null);
  const [readOnly, setreadOnly] = useState(false);

  const getChainID = async(provider) => {
    const {chainId} =  await provider.getNetwork();
    if (chainId !== CHAIN_ID) {
      setreadOnly(true);
      window.alert(`Please switch to the ${NETWORK_NAME} network`);
      throw new Error(`Please switch to the ${NETWORK_NAME} network`);
    }
  }

  const getEthereumContract = () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        getChainID(provider);
        const transactionContract = new ethers.Contract(
          ContractAddress,
          ContractABI,
          signer
        );
        return transactionContract;
      }
    } catch (error) {
      console.log(error);
    }
  };

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

    /*
    const retrieveNFTData = async() => {
      const transactionContract = getEthereumContract();
      const allcids = await transactionContract.getAllChartElementNames();
      psArray = allcids.split(" ");
      console.log(psArray);
      
      for (var i=0; i<psArray.length; i++) {
        let cid = psArray[i].slice(7,psArray[i].length); 
        console.log(cid);
        if (cid !== "") {
          await fetch(`https://ipfs.io/ipfs/${cid}`)
          .then(response => response.text())
          .then(data => {
          const obj = JSON.parse(data);
          const image = obj.image;
          const name = obj.name;
          if (name === "Aries" || name === "Taurus" || name === "Gemini" || name === "Cancer" || name === "Leo" || name === "Virgo" || name === "Libra" || name === "Scorpio" || name === "Sagittarius" || name === "Capricorn" || name === "Aquarius" || name === "Pisces") 
          {
            signs.set(name, "https://ipfs.io/ipfs/".concat(image.slice(7,image.length)));
          }
          else if (name === "Sun" || name === "Moon" || name === "Mercury" || name === "Venus" || name === "Mars" || name === "Jupiter" || name === "Saturn" || name === "Uranus" || name === "Neptune" || name === "Pluto"){
            planets.set(name, "https://ipfs.io/ipfs/".concat(image.slice(7,image.length)));
          }})
        }
      }
      };
    */
    const storeNFT = async() => {
      const metadata = await client.store({name:"Sun Sign", description:"The Sun rules your inner will", image: new File([".\\src\\assets\\signs\\".concat(SunSign).concat(".png")], SunSign.concat('.png'), {type: 'image/png'})});
      const cid = metadata.url.replace('ipfs://','');
      allNFTs.push(cid);
      const metadata2 = await client.store({name:"Rising Sign", description:"The Rising Sign is how the world sees you", image: new File([".\\src\\assets\\signs\\".concat(RisingSign).concat(".png")], RisingSign.concat('.png'), {type: 'image/png'})});
      const cid2 = metadata2.url.replace('ipfs://','');
      allNFTs.push(cid2);
      const metadata3 = await client.store({name:"Chart Ruler", description:"The Chart Rules influences on how you approach everything in life", image: new File([".\\src\\assets\\signs\\".concat(ChartRuler).concat(".png")], ChartRuler.concat('.png'), {type: 'image/png'})});
      const cid3 = metadata3.url.replace('ipfs://','');
      allNFTs.push(cid3);
      const metadata4 = await client.store({name:"North Node", description:"The North Node describes your life potential and karma", image: new File([".\\src\\assets\\signs\\".concat(NorthNodeSign).concat(".png")], NorthNodeSign.concat('.png'), {type: 'image/png'})});
      const cid4 = metadata4.url.replace('ipfs://','');
      allNFTs.push(cid4);
      console.log(allNFTs);
    };
    
    useEffect(() => {
      calculateSunSign(date);
      calculateRisingSign(time);
      calculatechartRuler()
      calculatenorthnode(date);
    });

    async function mintNFT() {
      setIsMinting(true);
      try {
        const transactionContract = getEthereumContract();
        for (var i = 0; i < allNFTs.length; i++) {
          const transaction = await transactionContract.mintNFT("ipfs://".concat(allNFTs[i]));
        //Pay gas fees and wait for the transaction to be confirmed
        await transaction.wait();
        }
        // Transaction is confirmed, you can perform any additional actions here if needed
      } catch (e) {
        // Handle errors
      } finally {
        setIsMinting(false);
      }
    };

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
      risingSignTimes.set(finalRisingSignArray[7], [18,19])
      risingSignTimes.set(finalRisingSignArray[8], [20,21])
      risingSignTimes.set(finalRisingSignArray[9], [22,23])
      risingSignTimes.set(finalRisingSignArray[10], [0,1])
      risingSignTimes.set(finalRisingSignArray[11], [2,3])
      const risingSignValue = Number(time.slice(0,2));
      for (let [key, value] of risingSignTimes) {
        if (risingSignValue === value[0] || risingSignValue === value[1])
        setRisingSign(key);
        }
    };

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
    };

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
    };
    
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
        }}};

  function handleDateInput({ target }) {
      setDate(target.value);
  };

  function handleTimeInput({ target }) {
    setTime(target.value);
  };

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
          {/*<label> <b>Store Assets on NFTStorage</b> </label>
          <br />
          <label>NFT Name: &nbsp;</label>
          <input type = "text" value = {NFTname} disabled = {readOnly} onChange={(e) => setNFTName(e.target.value)} placeholder = "Name"/> 
          <br />
          <label>NFT Description: &nbsp;</label>
          <input type = "text" value = {NFTdescription} disabled = {readOnly} onChange={(e) => setNFTDescription(e.target.value)} placeholder = "Description"/>
          <br />
          <label>NFT File: &nbsp;</label>
          <input type = "file" disabled = {readOnly} onChange={(e) => setNFTFile(e.target.files[0])} placeholder = "File Path"/>
          <br />
          <br />
          <button disabled={isStoring} onClick={storeNFT}> {isStoring ? "Storing..." : "Store"} </button>
          <br />
          <br />*/}
          <label><b>Enter Horoscope Chart Details</b></label>
          <br />
          <label>Enter Full Name: &nbsp;</label>
          <input type = "text" defaultValue = {FullName} placeholder = "Enter your full name" disabled = {readOnly} onChange={(e)=>(setFullName(e.target.value))}/>
          <br />
          <label>Enter Date and Time: &nbsp;</label>
          <input onChange={handleDateInput} value={date} disabled = {readOnly} type="date" id="dob" />
          <input onChange={handleTimeInput} value={time} disabled = {readOnly} type="time" id="tob" />
          <br />
          <br />
          <h3><b>Horoscope Chart Summary</b></h3>
          <label> <b>Full Name:</b> {FullName}</label>
          <br />
          <br />
          <label> <b>&emsp; Sun Sign &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Rising Sign &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &emsp; Chart Ruler &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; North Node </b></label>
          <br />
          <br />
          <img src={signs.get(SunSign)} width={250} height={250} alt="Sunsign" />
          <img src={signs.get(RisingSign)} width={250} height={250} alt="Risingsign" />
          <img src={planets.get(ChartRuler)} width={250} height={250} alt="ChartRuler" />
          <img src={signs.get(NorthNodeSign)} width={250} height={250} alt="NorthNode" />
          <br />
          <br />
          <button disabled={isStoring} onClick={storeNFT}> {isStoring ? "Storing..." : "Store"} </button>
          <button disabled={isMinting} onClick={mintNFT}>
          {isMinting ? "Minting..." : "Mint"}
      </button>
      </div>
      </header>
    </div>
  );
}

export default App;