// ! Writing a function to get the logged in user id from the token!

export function getLoggedInUserId() {
  // ! If there's no localStorage available, return false
  if (!localStorage) return false
  // ! Get the token from localStorage
  const token = localStorage.getItem("token")
  // ! Check if token exists
  if (!token) return false
  // ! We now know we have the token if we get to line 10.
  // ! Let's get the userID
  const middlePart = token.split('.')[1]
  const decodedString = window.atob(middlePart)
  const decodedObj = JSON.parse(decodedString)
  return decodedObj.userId
}

// ! Writing a function to check if the logged in user created something.
export function isCreator(userIdToCompare) {
  if (!userIdToCompare) return false
  return userIdToCompare === getLoggedInUserId()
}