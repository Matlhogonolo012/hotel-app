import Logo from "../components/logo"

function PageDoesNotExist(){
    return(
        <div>
            <header>
            <Logo />
            </header>
            <h2> Error 404</h2>
            <p>Sorry, we dont have that here</p>

        </div>
    )
}
export default PageDoesNotExist