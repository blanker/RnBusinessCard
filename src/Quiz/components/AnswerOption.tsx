import { Pressable, Text, StyleSheet} from "react-native";
import { useQuizContext } from "../providers/QuizProvider";

type AnswerOption = {
    option: string;
}
export default function AnswerOption({option }: AnswerOption){
    const { selectedOption, setSelectedOption } = useQuizContext();
    const isSelected = selectedOption === option;

    return (
        <Pressable
            onPress={() => setSelectedOption(option)}
            style={[
                styles.container,
                isSelected && {
                    backgroundColor: '#E1F396',
                    borderColor: '#E1F396' ,
                },
            ]}
        >
            <Text style={styles.answerOption}>{option}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'lightgray' ,
        borderWidth: 1,
        padding: 20,
        borderRadius: 100,
    },
    answerOption: {

    },
});