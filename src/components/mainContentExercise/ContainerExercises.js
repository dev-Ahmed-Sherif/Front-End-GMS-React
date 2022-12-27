
import './ContainerExercises.css';
import ExerciseCard from '../exerciseCard/ExerciseCard';
import AllExercise from '../../pages/AllExercise';

function ContainerExercises() {
    return (
        <div id="containerApi">
            {/* <ExerciseCard></ExerciseCard> */}
            <AllExercise></AllExercise>
        </div>
    );
}

export default ContainerExercises;