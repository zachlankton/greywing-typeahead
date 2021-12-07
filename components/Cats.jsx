import Cat from "./Cat";

export default function Cats({ cats }) {
    const flexContainer = {
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    };

    return (
        <>
            <div style={flexContainer}>
                {cats.map((cat) => (
                    <Cat key={cat.id} cat={cat} />
                ))}
            </div>
        </>
    );
}
