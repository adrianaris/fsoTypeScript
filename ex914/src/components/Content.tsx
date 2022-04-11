const Content = ({ courseParts }: { courseParts: Array<{ name: string, exerciseCount: number }> }) => {
  return (
    <>
      {courseParts.map(part => (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      ))}
    </>
  )
};

export default Content;
