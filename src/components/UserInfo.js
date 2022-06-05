export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector, id }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = id
  }

  getUserInfo = () => {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
      _id: this._id
      };
  }

  setUserInfo(name, job, avatar, id) {
    this._name.textContent = name;
    this._job.textContent = job;
    this._avatar.src = avatar;
    this._id = id
  }
}