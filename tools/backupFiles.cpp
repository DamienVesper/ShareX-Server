/**
 * @name Backup Files
 * @author DamienVesper
 * Backup files on the ShareX public media directory to a secondary location.
 **/

#include <iostream>
#include <filesystem>

using namespace std;

int main () {
    const string filesDirectory = "/var/www/sharex/i";
    const string backupDirectory = "/home/damienvesper/sharex/media";

    char confirmBackup;

    cout << "Are you sure you want to create a backup of the ShareX media? [Y/n] ";
    cin >> confirmBackup;

    if (confirmBackup != 'y') {
        cout << "\nBackup aborted.";
        return;
    } else {
        filesystem::copy(filesDirectory, backupDirectory);
        cout << "\nSuccesfully backed up all media.";
    }
}
