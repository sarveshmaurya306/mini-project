import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    main_button:{
        background: '#00d3ff8c',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000000',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        // border:'0px 0px 0px transparent',
        borderRadius: '8px',
    },
    home_text:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '41px',
        display: 'flex',
        alignItems:' center',
        textAlign: 'center',
        letterSpacing:' 0.02em',
        color: '#000000',
        textShadow:' 7px 7px 7px rgba(0, 0, 0, 0.35)',
    },
    form:{
        border: '2px solid #000000',
        boxSizing: 'border-box',
        borderRadius: '16px',
        textAlign:'center'
    },
    form_header:{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight:' bold',
        fontSize:' 30px',
        lineHeight: '169.1%',
        display: 'flex',
        alignItems:' center',
        textAlign: 'right',
        letterSpacing: '0.02em',
        textDecorationLine: 'underline',
        color: '#000000',
    }
})
export default useStyles
