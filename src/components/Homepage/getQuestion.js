const getQuestions= () =>{
    let url=`https://opentdb.com/api.php?amount=5`
    return fetch(url)
		.then(res => res.json())
		.then(data => data.results);
}

export default getQuestions;
