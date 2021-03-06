#!/bin/bash

if [ -z "$1" ]; then
	echo "Package location is undefined!"
	exit 1
fi

if [ -z "$2" ]; then
	echo "Package name is undefined!"
	exit 1
fi

packageLocation=$1
packageName=$2

rootPath=$(pwd)
scriptPath="${rootPath}/scripts"
templatePath="${rootPath}/templates/default"

echo "π Start to creat new package ${packageName} in ${packageLocation}..."

# ν¨ν€μ§ μμ±
echo "βοΈ Init ${packageName}"

mkdir "${packageLocation}"
cd "${packageLocation}" || exit
mkdir "${packageName}"
cd "${packageName}" || exit

packagePath=$(pwd)

npm init

echo "β Finish"

# Typescript μΈν
sh "${scriptPath}/set-up-typescript.sh" "${rootPath}" "${packagePath}"

# gulp μΈν
sh "${scriptPath}/set-up-gulp.sh" "${rootPath}" "${packagePath}"

# lint μΈν
sh "${scriptPath}/set-up-lint.sh" "${rootPath}" "${packagePath}"

# jest μΈν
sh "${scriptPath}/set-up-jest.sh" "${rootPath}" "${packagePath}"

# package.json μμ 
sh "${scriptPath}/add-default-script-in-package.sh" "${templatePath}" "${packagePath}" "${scriptPath}"

# κΈ°λ³Έ νμΌ μΈν
echo "βοΈ set up default file"

cp -r "${templatePath}/lib" "${packagePath}"
cp -r "${templatePath}/test" "${packagePath}"

echo "β Finish"

# npm ignore
echo "βοΈ copy npm ignore"

cp "${rootPath}"/.npmignore "${packagePath}"

echo "β Finish"

# git
echo "βοΈ copy git ignore"

cp "${rootPath}"/.gitignore "${packagePath}"
git add .

echo "β Finish"

echo "π Finish to install ${packageName} in ${packageLocation}"

cd "${rootPath}" || exit
npm run package:sort
