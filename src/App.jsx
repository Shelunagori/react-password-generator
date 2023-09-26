import { useState, useCallback, useEffect, useRef } from 'react'
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook

  const passwordRef = useRef(null);

  /**
   * we are using useCallback to optimize all possible call for passwrod generation.
   * here we have 3 ways (method) to call passwrod generator methods (length, numberAllowed, charAllowed).
   * useCallback will store it in cache. so that it can memoize previous calls.
   * [length, numberAllowed, charAllowed, setPassword] is dependency array of useCallback.
   * 
   * Including "setPassword" in the dependency array ensures that the passwordGenerator function 
   * always uses the most up-to-date version of "setPassword" available in the component's scope.
   */
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let randomString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) randomString += "0123456789";
    if(charAllowed) randomString += "!@#$%^&*()*+,-./:;<=>?";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * randomString.length + 1);
      pass += randomString.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  /** 
  *  useEffect we are using to call the password generator function when any of length, numberAllowed, charAllowed, passwordGenerator inputs/methods change.
  */

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
          <h1 className='text-center text-white my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input type="range" min={8} max={40} value={length} className='cursor-pointer' 
                onChange={(e) => {setLength(e.target.value)}} />
                <label>Length: {length}</label>
              </div>
              <div className='flex items-center gap-x-1'>
                  <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" 
                    onChange={() => {
                      setNumberAllowed((prev) => !prev);
                    }}/>
                    <label htmlFor="numberInput">Number</label>
              </div>
              <div className='flex items-center gap-x-1'>
                  <input type="checkbox" defaultChecked={charAllowed} id="charactersInput" 
                    onChange={() => {
                      setCharAllowed((prev) => !prev);
                    }}/>
                    <label htmlFor="charactersInput">Characters</label>
              </div>
          </div>
      </div>
  )
}

export default App
