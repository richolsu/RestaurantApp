import { StyleSheet } from 'react-native';

export const AppStyles = {
  color: {
    main: '#5ea23a',
    text: '#555555',
    white: 'white'
  },
  fontSize: {
    title: 40,
    content: 20,
  },
  buttonWidth: {
    main: '80%',
  },
  fontName: {
    main: 'FallingSky',
    bold: 'FallingSkyBd'
  },
  borderRadius: {
    main: 25,
    small: 5
  }
}

export const ButtonStyle = StyleSheet.create({
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.main,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 20, 
  },    
  loginText: {
    color: AppStyles.color.white
  },
  signupContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    borderWidth:1,
    borderColor:AppStyles.color.text,
    marginTop: 20, 
  },    
  signupText: {
    color: AppStyles.color.text
  },
});

export const TextStyle = StyleSheet.create({
  title: {
    fontSize:AppStyles.fontSize.title,
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.main,
    marginTop: 20,
    marginBottom: 20,
  },    
  content: {
    textAlign: 'center',
    fontFamily: AppStyles.fontName.main,
    fontSize:AppStyles.fontSize.content,
    color: AppStyles.color.text,
  }
});