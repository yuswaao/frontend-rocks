const Card = ({ image, title, children }: { image?: string; title?: string; children?: React.ReactNode }) => {
  return (
    <div className="bg-white w-60 flex flex-col rounded-xl shadow-md overflow-hidden">
      {image && <img src={image} alt={title || ""} className="w-full h-48 object-cover" />}
      {title && <p className="p-4 text-center font-semibold">{title}</p>}
      {children}
    </div>
  );
};

export const Root = () => {
  return (
    <div className="p-10 flex space-x-6">
      <Card image="/frontend-rocks/geodude-pattern.png" title="Geodude" />
      <Card image="/frontend-rocks/geodude-pattern.png" title="Geodude" />
      <Card image="/frontend-rocks/geodude-pattern.png" title="Geodude" />
      <Card image="/frontend-rocks/geodude-pattern.png" title="Geodude" />
      <Card image="/frontend-rocks/geodude-pattern.png" title="Geodude" />
    </div>
  );
};