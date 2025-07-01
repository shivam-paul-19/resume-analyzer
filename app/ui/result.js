"use client"

export default function Result({result, setPage}) {
    return (
        <div>
            <h1 className="text-xl">Result</h1>
            <p>{result.ats}</p>
            <p>{result.summary}</p>
            {result.week}
            {result.sugg}
            <p>{result.match}</p>
            <p>{result.unmatch}</p>
            <button className="bg-sky-500 hover:bg-sky-700 p-2 rounded-lg" onClick={() => {setPage(0)}}>Upload another resume</button>
        </div>
    )
}