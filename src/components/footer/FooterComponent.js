function Footer() {
    const background = {
        padding: '3% 0',
        textAlign: 'center',
        borderTop: '1px solid #E5E5E5',
    }

    const copyright = {
        // marginTop: 80,
        fontSize: 12,
    }

    return (

        <>
        <div className='container' style={background}>
            <p  style={copyright}>
                Copyright &copy; 2023. DevCamp. All rights reserved. | Persiapkan dirimu demi meraih pekerjaan impianmu !
            </p>
        </div>
        </>

    )
}

export default Footer;