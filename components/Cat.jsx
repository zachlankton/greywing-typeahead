import Image from "next/image";

export default function Cat({ cat }) {
    const flexChild = {
        maxWidth: 300,
        minWidth: 300,
        boxShadow: "1px 1px 11px -5px black",
        borderRadius: 10,
        textAlign: "center",
        margin: 20,
        padding: 20,
    };

    return (
        <div style={flexChild}>
            <p>{cat.tags.join(" ")}</p>
            <Image
                src={
                    cat.cmd
                        ? `${cat.cmd}`
                        : `https://cataas.com/c/${cat.id}?type=sq`
                }
                width={200}
                lazyBoundary="800px"
                height={200}
                alt="Cat"
            />
        </div>
    );
}
