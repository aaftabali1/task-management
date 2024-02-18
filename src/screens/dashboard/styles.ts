import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import {fontPixel} from '../../utils/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  taskContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.bgColor,
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  statusButtonToDo: {
    backgroundColor: 'lightblue',
    color: 'black',
  },
  statusButtonInProgress: {
    backgroundColor: 'lightgreen',
    color: 'black',
  },
  statusButtonDone: {
    backgroundColor: 'lightgrey',
    color: 'black',
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.black,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
  flexOne: {
    flex: 1,
  },
  editText: {
    color: colors.white,
    fontSize: 14,
  },
  editBtn: {
    backgroundColor: colors.black,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 3,
    paddingVertical: 2,
    marginEnd: 20,
  },
  editContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterBtn: {
    padding: 10,
    borderRadius: 5,
    marginEnd: 10,
  },
  filterText: {
    color: colors.white,
    textAlign: 'center',
  },
  filterHeading: {
    color: colors.black,
    fontSize: fontPixel(20),
    marginBottom: 10,
  },
});
