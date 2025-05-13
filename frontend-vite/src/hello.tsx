// src/Hello.tsx

type HelloProps = {
    name: string;
  };
  
  function Hello({ name }: HelloProps) {
    return <h2>שלום {name}!</h2>;
  }
  
  export default Hello;
  