'use client';

export default function Test() {
  const onClick = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contents`);
    const data = await res.json();

    console.log(data);
  };
  return <button onClick={onClick}>asdasdd</button>;
}
