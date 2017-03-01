package org.sxdata.jingwei.util;


import org.sxdata.jingwei.entity.CarteClient;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;


public class CarteTaskManager {
	public static LinkedBlockingDeque<Task> queue = new LinkedBlockingDeque<Task>(30000);
	private static boolean runFlag = true;
	public static boolean isRunFlag() {
		return runFlag;
	}
	public static void setRunFlag(boolean runFlag) {
		CarteTaskManager.runFlag = runFlag;
	}

	public static void addTask(CarteClient carteClient, String type, String url) {
		queue.add(new CarteTask(carteClient, type, url));
	}

	private static abstract class Task{
		public abstract void run();

	}

	private static class CarteTask extends Task{
		CarteClient carteClient;
		String type;
		String url;
		public CarteTask(CarteClient carteClient, String type, String url) {
			this.carteClient = carteClient;
			this.type = type;
			this.url = url;
		}

		@Override
		public void run() {
			CarteClient cc = this.carteClient;
			final String urlString = this.url;
			String result = null;
			try {
//			if(!task.equals("trans_exec")){
				result = cc.doGet(urlString);
//			}else {
//				cc.doGet(urlString);
//			}
			} catch (IOException e) {
				e.printStackTrace();
			}
			System.out.println(this + ":  ===>  在 carteId: " + cc.getSlave().getHostName() + " 执行: " + urlString + "  结果: " + result);
		}
	}

	public static void startThread(int num) {
		for (int i = 0; i < num; i++) {
			new Thread(new CarteTaskRunnable()).start();
		}
	}

	public static void disableThread() {
		setRunFlag(false);
	}

	static class CarteTaskRunnable implements Runnable {
		@Override
		public void run() {
			while (runFlag) {
				try {
					if (queue.peek() != null) {
						runTask();
					} else {
						TimeUnit.MILLISECONDS.sleep(50);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			while (queue.peek() != null) {
				runTask();
			}
		}

		public void runTask() {
			Task task = queue.poll();
			task.run();
		}
	}



}
