import { IonSelectOption } from '@ionic/react';
import { useApp_GetKennisgebiedenQuery } from '../__generated__/graphql';

const SectorenList: React.FC = () => {
  const { data } = useApp_GetKennisgebiedenQuery({
    fetchPolicy: 'cache-first',
  });

  return (
    <>
      {data?.Kennisgebieden.map((k) => (
        <IonSelectOption key={k.KennisgebiedID} value={k.Naam}>
          {k.Naam}
        </IonSelectOption>
      ))}
    </>
  );
};

export default SectorenList;
