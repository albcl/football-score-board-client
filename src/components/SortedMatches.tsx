const SortedMatches = ({ data }: { data: string[] }) => (
    <>
        <h2>Live Sorted Matches</h2>
        {data &&
            data.map((match: string, ix: number) => (
                <p key={match} style={{ background: ix % 2 ? '#f8f8f8' : '#e7e7e7', margin: 0 }}>
                    {match}
                    <br />
                </p>
            ))}
    </>
);

export default SortedMatches;
