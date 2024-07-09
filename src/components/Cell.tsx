
interface Props {
    id: number,
    value: string
    onClick: (id: number) => void
}


const styles = "w-[160px] h-[160px] bg-[#0F1D20] flex items-center justify-center rounded-2xl m-3 cursor-pointer "

export default function Cell(props: Props) {
    return (
        <div onClick={() => {
            props.onClick(props.id)
        }} className={props.value !== '' ? props.value === 'X' ? styles + 'border-4 border-green-500' : styles + "border-4 border-[#FA453B]" : styles + "hover:border border-white"}>
            {
                props.value !== '' ? props.value == 'X' ? <img src={"/X.svg"} width={70} alt="x" /> : <img src={"/O.svg"} width={80} alt="x" /> : <></>
            }
        </div>
    )
}