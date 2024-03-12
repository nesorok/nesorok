#include <iostream>
#include <array>
#include <locale.h>
using namespace std;
class DynArr {
private:
    int* arr;// Указатель на массив
    int cap;// Количество занятых ячеек массива
    int size;// Размер массива


    int incrArr() {
        
        if (cap>=size) 
        {
            size *= 2;
            int* newArr = new int[size];
            // Скопируем элементы в новый массив
            for (int i = 0; i < cap; i++) {
                newArr[i] = arr[i];
            }

            // Освободим старый массив, обновим указатель и размер
            delete[] arr;
            arr = newArr;
        }
        return 0;
    }
    
public:
    // Конструктор по умолчанию
    DynArr() { 
    cap = 0;
    size = 1;
    arr = new int[size]; 
    }
    
    // Деструктор
    ~DynArr() {
        delete[] arr;
    }

    // Добавить элемент в конец массива
    void back(int value) {
      
       incrArr();

        // Добавим новый элемент в конец массива

       arr[cap] = value;

        cap += 1;
    }

    // Добавить элемент в начало массива
    void front(int value) {
        if (cap >= size) {
    
            size*=2;
            int* newArr = new int[size];

            // Скопируем существующие элементы в новый массив, сдвинув их вправо
            for (int i = 0; i < cap; i++) {
                newArr[i + 1] = arr[i];
            }

       
            delete[] arr;
            arr = newArr;
        }
        else {
            // Сдвинем существующие элементы вправо
            for (int i = cap - 1; i >= 0; i--) {
                arr[i + 1] = arr[i];
            }
        }

        // Добавим новый элемент в начало массива и увеличим размер
        arr[0] = value;
        cap+=1;
    }

    // Добавить элемент по индексу
    void insert(int index, int value) {

        if (cap >= size) {

            size *= 2;
            int* newArr = new int[size];

            // Скопируем элементы до индекса
            for (int i = 0; i < index; i++) {
                newArr[i] = arr[i];
            }

            // Вставим новый элемент
            newArr[index] = value;

            // Скопируем оставшиеся элементы
            for (int i = index; i < cap; i++) {
                newArr[i + 1] = arr[i];
            }


            delete[] arr;
            arr = newArr;
        }
        else {
 
            for (int i = cap - 1; i >= index; i--) {
                arr[i + 1] = arr[i];
            }

            // Вставим новый элемент
            arr[index] = value;
        }

        cap+=1;
    }

    // Удалить элемент по индексу
    void remove(int index) {
       
        // Сдвинем элементы после индекса влево
        for (int i = index; i < cap - 1; i++) {
            arr[i] = arr[i + 1];
        }

        // Уменьшим размер массива
        cap-=1;
    }

    // Получить элемент по индексу
    int get(int index) {
   
        return arr[index];
    }

    // Поиск элемента по значению
    int find(int value) {
        for (int i = 0; i < cap; i++) {
            if (arr[i] == value) {
                return i;
            }
        }
        return -1; 
    }

    // Вывести все
    void print() {
        for (int i = 0; i < cap; i++) {
            cout << arr[i] << " ";
        }
       cout << endl;
    }
};

int main() {
    setlocale(LC_ALL, "Russian");
    DynArr arr;
    arr.back(4);
    arr.back(2);
    arr.back(5);
    arr.print();
    arr.front(11);
    arr.print();
    arr.insert(2, 7);
    arr.print();
    arr.remove(0);
    arr.print();
    cout << arr.get(0) << endl;
    cout << arr.find(5) << endl;


    return 0;
}