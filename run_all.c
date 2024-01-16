#include <stdlib.h>
#include <windows.h>

int main() {
    // Запуск сервера в новом процессе
    STARTUPINFO server_si = { sizeof(STARTUPINFO) };
    PROCESS_INFORMATION server_pi;
    CreateProcess(NULL, "run_server.exe", NULL, NULL, FALSE, 0, NULL, NULL, &server_si, &server_pi);

    // Задержка (например, 5 секунд)
    Sleep(5000);

    // Запуск службы в новом процессе
    STARTUPINFO serve_si = { sizeof(STARTUPINFO) };
    PROCESS_INFORMATION serve_pi;
    CreateProcess(NULL, "run_site.exe", NULL, NULL, FALSE, 0, NULL, NULL, &serve_si, &serve_pi);

    // Ожидание завершения обоих процессов
    WaitForSingleObject(server_pi.hProcess, INFINITE);
    WaitForSingleObject(serve_pi.hProcess, INFINITE);
/*
    // Выключение сервера
    system("путь_к_программе_с_кодом_выключения_сервера");

    // Выключение службы
    system("путь_к_программе_с_кодом_выключения_службы");
*/
    return 0;
}
