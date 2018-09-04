import { StyleSheet } from 'react-native';

export const AppStyles = {
  color: {
    main: '#5ea23a',
    text: '#555555',
    white: 'white',
    facebook: '#4267b2',
    grey: 'grey'
  },
  fontSize: {
    title: 30,
    content: 20,
    normal: 16,
  },
  buttonWidth: {
    main: '70%',
  },
  textInputWidth: {
    main: '80%'
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
    marginTop: 30, 
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
    marginTop: 30, 
  },    
  signupText: {
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30, 
  },    
  facebookText: {
    color: AppStyles.color.white
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
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  }, 
  content: {
    paddingLeft:50,
    paddingRight:50,    
    textAlign: 'center',
    fontFamily: AppStyles.fontName.main,
    fontSize:AppStyles.fontSize.content,
    color: AppStyles.color.text,
  }
});

export const TextInputStyle = StyleSheet.create({
  container: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
    paddingLeft: 10,
    paddingRight: 10
  }, 
  body: {
    color: AppStyles.color.text,
  }
});

export const FoodListItemStyle = StyleSheet.create({
  title: {
    fontWeight:'bold',
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
  },
  subtitleView: {
    paddingTop: 5
  },
  description: {
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    paddingLeft: 10,
  },
  price: {
    fontWeight:'bold',
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    marginTop: 10,
    paddingLeft: 10,
  },
  rightIcon: {
    width: 90,
    height: 90
  }
});


export const CategoryListItemStyle = StyleSheet.create({
  container: {
    flex:1,
    width: 200,
    height: 200,
    marginLeft:10,
    marginTop:10,    
    backgroundColor: 'green',
    alignItems: 'center', 
    justifyContent: 'center', 
  },

  title: {
    fontWeight:'bold',
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
  },
  image: {
    height: 200,
    width: '50%',
    flex:1
  }
});