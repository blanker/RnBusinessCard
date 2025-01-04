import {createContext, PropsWithChildren, useContext, useState} from "react";
import * as z from "zod";
import {router} from "expo-router";

export const PersonalInfoSchema = z.object ({
    fullName: z
        .string({ message: 'Full name is required' })
        .min(1, { message: 'Full name must be longer than 1'}),
    address: z.string().min(1, { message: 'Please provide your address!' }),
    city: z.string().min(1, { message: 'City is required' }),
    postCode: z.string().min(1, { message: 'Postal is required' }),
    country: z.string().length(2),
    phoneNumber: z.string().min(1, {message: 'Phone is required'}),
    birthdate: z.date(),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const PaymentInfoSchema = z.object ({
    cardNumber: z
        .string({ message: 'Card number is required' })
        .min(1, { message: 'Card number must be longer than 1'}),
    expireDate: z.string()
        .min(1, { message: 'Please provide your address!' })
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "MM/YY format")
    ,
    cvv: z.coerce.number()
        .min(100, {message: '100-999'})
        .max(999, {message: '100-999'}), //().length(3, { message: 'cvv(3) is required' }),
    saveCard: z.boolean().optional(),
    switchValue: z.boolean().optional(),
});

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

type CheckoutFormProvider = {
    personalInfo: PersonalInfo | undefined,
    setPersonalInfo: (value: PersonalInfo | undefined) => void,
    paymentInfo: PaymentInfo | undefined,
    setPaymentInfo:  (value: PaymentInfo | undefined) => void,
    onSubmit: () => void,
};

const CheckoutFormContext = createContext<CheckoutFormProvider>({
    personalInfo: undefined,
    setPersonalInfo: () => {},
    paymentInfo: undefined,
    setPaymentInfo:  () => {},
    onSubmit: () => {},
})


export default function CheckoutFormProvider({children} : PropsWithChildren) {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();
    const [paymentInfo,  setPaymentInfo]  = useState<PaymentInfo | undefined>();

    const onSubmit = () => {
        if (!personalInfo || !paymentInfo) {
            console.log("The form is incomplete");
            return;
        }
        // send to the server
        // ...

        setPersonalInfo(undefined);
        setPaymentInfo(undefined);

        router.dismissAll();
        router.back();
    }
    return (
        <CheckoutFormContext.Provider
            value={{personalInfo, setPersonalInfo, paymentInfo,  setPaymentInfo, onSubmit}}
        >
            {children}
        </CheckoutFormContext.Provider>
    )
}

export const useCheckoutForm = () => useContext(CheckoutFormContext);