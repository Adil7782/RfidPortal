import AddProductionLineForm from "@/components/forms/add-production-line-form"
import ShowProductionLines from "./show-production-lines"

const LineComponent = () => {
    return (
        <section className='my-16 px-8 pt-6 pb-8 border rounded-lg bg-slate-50'>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-dark font-medium text-xl">Manage the production lines for the Unit</h2>
                    <p className="mt-1 text-slate-500 text-sm">Select the production unit to see the lines</p>
                </div>
                <AddProductionLineForm />
            </div>
            <div className="mt-8">
                <ShowProductionLines />
            </div>
        </section>
    )
}

export default LineComponent