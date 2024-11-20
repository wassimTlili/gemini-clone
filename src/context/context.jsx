import { createContext, useState } from "react";
import run from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultsData, setResultsData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultsData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = ()=>{
        setLoading(false);
        setShowResults(false);
    }

    const onSent = async (prompt) => {
        setResultsData("");
        setLoading(true);
        setShowResults(true);
        let response;
        if (prompt !== undefined) {
            response = await run(prompt)
            setRecentPrompt(prompt);
 
        }
        else{
            setPreviousPrompt(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        try {
            let responseArray = response.split("**");
            let newResponse = "";

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.split("*").join("<br/>");
            let newResponseArray = newResponse2.split("");

            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord);
            }
        } catch (error) {
            console.error("Error fetching response:", error);
            setResultsData("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        previousPrompt,
        setPreviousPrompt,
        showResults,
        setShowResults,
        loading,
        setLoading,
        resultsData,
        setResultsData,
        onSent,
        newChat,
    };

    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    );
};

export default ContextProvider;
