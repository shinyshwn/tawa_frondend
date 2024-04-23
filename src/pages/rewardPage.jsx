import React, { useState, useEffect } from 'react';
import { rewardUrl } from '../backendUrls/urls';

const monthNames = ["", "February", "March", "April"];
const Reward = ({ userId }) => {
    const [rewardScore, setRewardScore] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(1);

    // useEffect(() => {
    //     fetch().then(res => res.json()).then(data => {
    //         setRewardScore(data.score);
    //     }).catch(err => console.error(err));
    // }, [userId]);

    const handelMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    }

    const handleFilter = () => {
        fetch(`${rewardUrl}?id=${userId}&month=${selectedMonth}`).then(res => res.json()).then(data => {
            console.log(data)
            setRewardScore(data);
        }).catch(err => console.error(err));
    }

    return (
        <div>
            <h2>Reward: {rewardScore || "Fetching..."}</h2>
            <div>
                <label >Select Month: </label>
                <select onChange={handelMonthChange} value={selectedMonth}>
                {[
                { month: 0, name: "all" },
                { month: 2, name: "February" },
                { month: 3, name: "March" },
                { month: 4, name: "April" }
            ].map(month => (
                <option key={month.month} value={month.month}>{month.name}</option>
            ))}
                </select>
                <div>
                    <button onClick={handleFilter}> Submit </button>
                </div>
            </div>
            <div>
                Total reward points for user {userId} on month {selectedMonth == 0 ? "Total" : monthNames[selectedMonth-1]}: {rewardScore}
            </div>
            
        </div>
    );
};

export { Reward }