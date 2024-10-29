import { useEffect, useRef, useState } from "react";

const CardIcon = ({ name }: { name: string }) => {
  const IconRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(
          `../assets/cards/${name}.svg`
        );
        IconRef.current = namedImport;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  if (!loading && IconRef.current) {
    const { current: ImportedIcon } = IconRef;
    return <img src={ImportedIcon} width={100} />;
  }

  return null;
};

export default CardIcon;
