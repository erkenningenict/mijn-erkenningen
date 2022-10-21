// import { IonToast } from '@ionic/react';
// import React, { useContext, useState } from 'react';

// export const ToastContext = React.createContext<{
//   showToast: (toast: {
//     message: string;
//     type: 'success' | 'danger';
//     duration?: number;
//   }) => void;
//   clearToast: () => void;
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
// }>({
//   showToast: (toast: {
//     message: string;
//     type: 'success' | 'danger';
//     duration?: number;
//   }) => {},
//   clearToast: () => {},
// });

// export const ToastProvider: React.FC = React.memo((props) => {
//   const [displayToast, setDisplayToast] = useState<boolean>(false);
//   const [toast, setToast] = useState<
//     | { message: string; type: 'success' | 'danger'; duration?: number }
//     | undefined
//   >(undefined);

//   return (
//     <ToastContext.Provider
//       value={{
//         showToast: ({ message, type, duration }) => {
//           setToast({
//             message,
//             type,
//             duration,
//           });
//           setDisplayToast(true);
//         },
//         clearToast: () => {
//           setDisplayToast(false);
//           setToast(undefined);
//         },
//       }}
//     >
//       {props.children}
//       <IonToast
//         isOpen={displayToast}
//         message={toast?.message}
//         onDidDismiss={() => {
//           if (displayToast) {
//             setToast(undefined);
//             setDisplayToast(false);
//           }
//         }}
//         duration={
//           typeof toast?.duration === 'undefined' ? 3000 : toast?.duration
//         }
//         position="bottom"
//         color={toast?.type}
//         buttons={[
//           {
//             side: 'end',
//             role: 'cancel',
//             text: 'X',
//             handler: () => {
//               setDisplayToast(false);
//             },
//           },
//         ]}
//       />
//     </ToastContext.Provider>
//   );
// });

// export const useToastContext = () => {
//   return useContext(ToastContext);
// };

import React, {
  createContext,
  useContext,
  FC,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
import { ToastOptions, IonToast } from '@ionic/react';
import { ReactControllerProps } from '@ionic/react/dist/types/components/createControllerComponent';

type ReactToastOptions = ToastOptions & Partial<ReactControllerProps>;

type ToastInstance = {
  present: (options?: ReactToastOptions) => void;
  dismiss: () => void;
};

type ToastProviderOptions = {
  create: (options: ReactToastOptions) => ToastInstance;
  success: (message: string) => ToastInstance;
  error: (message: string) => ToastInstance;
  warning: (message: string) => ToastInstance;
};

const ToastContext = createContext<ToastProviderOptions | null>(null);
const { Provider } = ToastContext;

interface Props {
  value?: ToastOptions;
}

export const useToast = () => useContext(ToastContext) as ToastProviderOptions;

export const ToastProvider: FC<Props> = ({ value, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ReactToastOptions>();
  const ref = useRef<HTMLIonToastElement | null>(null);

  const create = useCallback(
    (options: ReactToastOptions) => {
      const present = (options: ReactToastOptions) => () => {
        setOptions({
          ...value,
          ...options,
        });
        setIsOpen(true);
      };

      const dismiss = () => {
        ref.current?.dismiss();
      };

      return {
        present: present(options),
        dismiss,
      };
    },
    [value],
  );

  const contextValue = useMemo(() => {
    const translateToOptions =
      (color: 'success' | 'warning' | 'danger') => (message: string) => {
        const toast = create({ message, color });
        toast.present();
        return toast;
      };

    return {
      create,
      success: translateToOptions('success'),
      error: translateToOptions('danger'),
      warning: translateToOptions('warning'),
    };
  }, [create]);

  return (
    <Provider value={contextValue}>
      {children}
      <IonToast
        ref={ref}
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        {...options}
      />
    </Provider>
  );
};
