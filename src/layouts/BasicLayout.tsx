import { Navbar } from "@/components"

const BasicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />

            <div>
                {children}
            </div>
        </div>
    )
}

export default BasicLayout