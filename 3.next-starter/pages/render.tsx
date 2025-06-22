type renderProps = {
    name: String;
};

export async function getServerSideProps() {
    const res = await fetch("http://api.github.com/repos/vercel/next.js");
    const json = await res.json();
    return {
        props: {
            name: json.language
        }
    }
}

export default function Render({ name }: renderProps) {
    return <div>detail---{name} </div>
}