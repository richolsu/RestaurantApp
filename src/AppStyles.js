import { StyleSheet } from 'react-native';

export const AppStyles = {
  color: {
    main: '#5ea23a',
    text: '#555555',
    white: 'white',
    facebook: '#4267b2',
    grey: 'grey',
    placeholder: '#a0a0a0'
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
    borderWidth: 1,
    borderColor: AppStyles.color.text,
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
  headerButtonContainer: {
    padding: 10
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 35,
    height: 35,
    margin: 6
  }
});

export const TextStyle = StyleSheet.create({
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
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
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  }
});

export const TextInputStyle = StyleSheet.create({
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red'
  },
  container: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  }
});

export const FoodListItemStyle = StyleSheet.create({
  title: {
    fontSize: 18,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
  },
  subtitleView: {
    paddingTop: 5
  },
  description: {
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.main,
    paddingLeft: 10,
  },
  price: {
    fontSize: 18,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    marginTop: 10,
    paddingLeft: 10,
  },
  rightIcon: {
    width: 100,
    height: 100
  }
});


export const CategoryListItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 200,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
  },
  image: {
    height: 200,
    width: '50%',
    flex: 1
  }
});