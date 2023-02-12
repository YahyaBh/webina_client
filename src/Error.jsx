import Error404 from './Assets/Images/404 Error Page not Found with people connecting a plug-amico(1).svg'

const Error = () => {
    return (
        <div className='app__not__found'>
            <img src={Error404} alt='404 Error' width='100%'/>
            <h2>Page Not Found , Back To Home Page ?</h2>
            <a href='/'>
                <button>Go Home</button>
            </a>
        </div>
    )
}

export default Error