import { useEffect, useRef, useState } from "react";

const CardIcon = ({ name, width = 50 }: { name: string; width: number }) => {
  const [icon, setIcon] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(
          `../assets/cards/${name}.svg`
        );
        setIcon(namedImport);
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  if (!loading && icon) {
    return <img src={icon} width={width} />;
  }

  return null;
};

export default CardIcon;
