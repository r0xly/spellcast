type WordPreviewProps = {
  word: string;
  points: number;
};

export const WordPreview = ({ word, points }: WordPreviewProps) => {
  return (
    <div className="relative w-full h-16 mb-5 bg-slate-950 text-white rounded-xl flex items-center px-5">
      <p className="absolute left-1/2 transform -translate-x-1/2 font-bold text-2xl uppercase">
        {word}
      </p>

      {points > 0 && (<p className="ml-auto text-base">{`+${points}`}</p>)}
    </div>
  );
};