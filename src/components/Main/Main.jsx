import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { context } from '../../context/context';

function Main() {
    const { recentPrompt, showResults, loading, resultsData, setInput, input, onSent } = useContext(context);

    const handleSubmit = () => {
        onSent();
        setInput(''); 
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemininii</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResults ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, PIWPIW.</span></p>
                            <p>How can I help you?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            {/* Ensure no children are used if dangerouslySetInnerHTML is set */}
                            <p dangerouslySetInnerHTML={{ __html: recentPrompt }}></p>
                        </div>
                        <div className="results-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                 <p dangerouslySetInnerHTML={{ __html: resultsData }}></p>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder='Enter your question here' 
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={handleSubmit} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw piw
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
