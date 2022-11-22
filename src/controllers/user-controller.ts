import { userService } from "../services/user-service";

class UserController {
  async registration(req, res) {
    try {
      const { login, password } = req.body;
      const userData = await userService.registation(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return res.json(e);
    }
  }

  async login(req, res) {
    try {
      const { login, password } = req.body;
      const userData = await userService.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return res.json(e);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      return res.json(e);
    }
  }

  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return res.json(e);
    }
  }

  async getAll(req, res) {
    try {
      const allUsers = await userService.getAll();
      return res.json(allUsers);
    } catch (e) {
      return res.json(e);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUser(id);

      return res.json(user);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default UserController;
